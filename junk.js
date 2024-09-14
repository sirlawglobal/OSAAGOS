exports.updateUserProfile = async (req, res) => {
    const {
      name,
      email,
      phone,
      education,
      profession,
      graduationYear,
      fieldOfStudy,
      role,
      company,
      address,
    } = req.body;
  
    try {
      const user = await User.findById(req.user._id); 
      // Use req.user._id instead of req.user.id
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.education = education || user.education;
      user.profession = profession || user.profession;
      user.graduationYear = graduationYear || user.graduationYear;
      user.fieldOfStudy = fieldOfStudy || user.fieldOfStudy;
      user.address = address || user.address;
      user.company = company || user.company;
      user.role = role || user.role;
  
      if (req.file) {
        // const baseUrl = `${req.protocol}://${req.get("host")}`;
  
        // user.profilePicture =
        //   `${baseUrl}/uploads/${req.file.filename}` || user.profilePicture;
        user.profilePicture = req.file
      }
  
      await user.save();
  
      res.json(
        user.toJSON({
          virtuals: true,
          versionKey: false,
          transform: (doc, ret) => {
            delete ret.password;
            delete ret.plainPassword;
  
            return ret;
          },
        })
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };