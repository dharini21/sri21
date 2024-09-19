const bcrypt = require("bcrypt");
const config = require('./../config/config.js')
const jwt = require('jsonwebtoken')
const Availability = require('./../models/availability.js')
const Doctor = require("./../models/doctor.js")
const User = require("./../models/user.js")
const { updateEmail } = require('./../email/sendemail.js')
const Appointment = require("./../models/appointment.js");
async function createDoctor(req, res) {
  try {
    const { name, phoneNo, email, hospitalName, specialist, experience, password, role, address } = req.body;
    const ifExits = await Doctor.findOne({ $or: [{ email }, { phoneNo }] })
    if (ifExits) return res.status(400).send("Doctor already exits")
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new Doctor({
      name,
      phoneNo,
      email,
      hospitalName,
      specialist,
      experience,
      password:hashedPassword,
      role,
      address

    })
    await doctor.save();
    return res.status(200).json({ message: "doctor registration successfully..", doctor: doctor })
  } catch (error) {
    console.error(error);
  }
}


async function loginDoctor(req, res) {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email })
    if (!doctor) return res.status(400).send('Bad request')

    const isMatch = bcrypt.compare(password, doctor.password)
    if (!isMatch) return res.status(400).send('send invalid password')

    const token = jwt.sign({ doctor: doctor._id, role: doctor.role }, config.jwtSecret, { expiresIn: '24h' })
    res.json({ doctor, token })
  } catch (error) {
    console.error(error);
  }
}


async function getDoctor(req, res) {
  try {
    const doctorID = req.params.id;
    const doctor = await Doctor.findById(doctorID);
    if (!doctor) return res.status(401).send("Doctor not found..")
    res.status(200).json({ message: "get successfully", doctor: doctor });
  } catch (error) {
    console.error(error);
  }
}

async function updateDoctor(req, res) {
  try {
    const doctorId = req.params.id;
    const { name, specialist, phoneNo, email,address, password } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(401).send("Doctor not found..")

    const updatedDoctor = {
      name,
      specialist,
      phoneNo,
      email,
      address
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedDoctor.password = hashedPassword;
    }

    const result = await Doctor.findByIdAndUpdate(doctorId, updatedDoctor, password,{ new: true })
    if (result) res.status(200).json(result)
  } catch (error) {
    console.error(error);
  }
}


async function deleteDoctor(req, res) {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).send("doctor not found");
    await doctor.deleteOne();
    return res.status(200).send("doctor account was deleted successfully...");
  } catch (error) {
    console.error(error);
  }
}

async function createAvailability(req, res) {
  try {
    const { doctorId, slots } = req.body;
    const newAvailability = new Availability({
      doctorId,
      slots
    });

    const savedAvailability = await newAvailability.save();
    res.status(201).json({
      message: "Availability created successfully",
      availability: savedAvailability,
      doctorId: savedAvailability.doctorId
    });
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).send('Internal Server Error');
  }
}


async function getAvailability(req, res) {
  try {
    const { doctorId } = req.params;

    const availability = await Availability.find({ doctorId });

    if (!availability.length) {
      return res.status(404).send("No availability found for this doctor");
    }

    res.status(200).json({
      message: "Availability retrieved successfully",
      availability
    });
  } catch (error) {
    console.error('Error retrieving availability:', error);
    res.status(500).send('Internal Server Error');
  }
}


async function updateAvailability(req, res) {
  try {
    const { availabilityId } = req.params;
    const updateFields = req.body;

    const updatedAvailability = await Availability.findByIdAndUpdate(
      availabilityId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedAvailability) {
      return res.status(404).send("Availability not found");
    }

    res.status(200).json({
      message: "Availability updated successfully",
      availability: updatedAvailability
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).send('Internal Server Error');
  }
}


async function getDoctorAppointments(req, res) {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name')
      .populate('doctorId', 'name');

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error geting doctor appointments:', error);
  }
}

async function updateAppointment(req, res) {
  try {
    const { appointmentId } = req.params;
    const {doctorId} = req.params.doctorId;
    const { userId, status } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (status !== 'ACCEPTED' && status !== 'REJECTED' && status!=='COMPLETED') {
      return res.status(400).json({ message: 'Invalid status. Status must be ACCEPTED or CANCELED.' });
    }

    appointment.status = status;
    await appointment.save();

    const updatedDoctor = await Doctor.findOneAndUpdate(
      {
        _id: doctorId,
        'userAppointments.userId': appointment.patientId,
        'userAppointments.date': appointment.date,
        'userAppointments.time': appointment.time
      },
      {
        $set: { 'userAppointments.$.status': status }
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor or appointment not found in userAppointments' });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: appointment.patientId,
        'appointments.doctorId': doctorId,
        'appointments.date': appointment.date,
        'appointments.time': appointment.time
      },
      {
        $set: { 'appointments.$.status': status }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User or appointment not found in appointments' });
    }

    const doctorExists = await Doctor.findById(doctorId);
    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updateEmail(userExists.email, doctorExists.name, userExists.name, appointment.day, appointment.date, appointment.time, appointment.reason, appointment.status)
    res.status(200).json({ message: `Appointment updated successfully`, appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createDoctor, loginDoctor, getDoctor, updateDoctor, deleteDoctor, createAvailability, getAvailability, updateAvailability, getDoctorAppointments, updateAppointment }