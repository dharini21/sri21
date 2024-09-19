const bcrypt = require("bcrypt");
const Admin = require("./../models/admin.js");
const config = require("./../config/config.js");
const jwt = require("jsonwebtoken");

async function createAdmin(req, res) {
  try {
    const { name, email, phoneNo, password, address } = req.body;

    const ifExits = await Admin.findOne({ $or: [{ email }, { phoneNo }] });
    if (ifExits) return res.status(400).send("admin already exits..");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name,
      email,
      phoneNo,
      password: hashedPassword,
      address,
    });
    await admin.save();
    return res
      .status(200)
      .json({ message: "admin registration successfully", admin: admin });
  } catch (error) {
    console.error("error", error);
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, phoneNo, password } = req.body;
    const admin = await Admin.findOne({ $or: [{ email }, { phoneNo }] });
    if (!admin) return res.status(400).send("Bad request");

    const isMatch = bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).send("send invalid password");

    const token = jwt.sign({ admin: { id: admin.id } }, config.jwtSecret, {
      expiresIn: "24h",
    });
    res.json({ admin, token });
  } catch (error) {
    console.error(error);
  }
}

async function getAdmin(req, res) {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).send("admin not found");

    res.status(200).json({ message: "admin get sucessfully", admin: admin });
  } catch (err) {
    console.error(err);
  }
}

async function updateAdmin(req, res) {
  try {
    const adminId = req.params.id;
    const {name,email,phoneNo,password}=req.body;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).send("admin not found");
    
    const updateadmin = {
      name,
      email,
      phoneNo,
      address,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateadmin.password = hashedPassword;
    }
    const result = await Admin.findByIdAndUpdate(adminId, updateadmin,{new:true});
    if (result) return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
}

async function deleteAdmin(req, res) {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).send("Not found");

    await admin.deleteOne();
    return res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createAdmin,
  loginAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
