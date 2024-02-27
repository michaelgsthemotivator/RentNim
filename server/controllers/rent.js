const { User, Rent } = require("../models");

const getUserRent = async (req, res, next) => {
  try {
    // console.log("hallo aku di rent");
    const rentData = await Rent.findAll({
      where: { UserId: req.userToFind.id },
    });
    // console.log(rentData, "aku rent data dicontroll");

    // Check for expiration
    const expire = [];
    rentData.map(async (el) => {
      if (el.paid == true && el.expired == false) {
        const diff = (new Date() - new Date(el.updatedAt)) / 1000;

        if (
          (el.duration == 7 && diff > 604800) ||
          (el.duration == 30 && diff > 18144000) ||
          (el.duration == 90 && diff > 54432000)
        ) {
          // detik diffnya ganti angka 1, artinya durasi sebelum expired adalah 1 detik dihitung dari 1 hari kedepan dari hari ini
          // await Rent.findByPk(el.id)
          expire.push(el.id);
        } else {
          const totalRentingDuration = el.duration * 24 * 60 * 60; // Convert duration to seconds

          // const remainingTimeInSeconds = Math.max(
          //   totalRentingDuration - diff,
          //   0
          // );

          const remainingTimeInSeconds = totalRentingDuration - diff;

          // Update the rental with the remaining time
          await Rent.update(
            { timeRemaining: remainingTimeInSeconds },
            { where: { id: el.id } }
          );
        }
      }
    });
    if (expire.length != 0) {
      for (let i = 0; i < expire.length; i++) {
        const element = expire[i];
        await Rent.update({ expired: true }, { where: { id: element } });
      }
    }
    res.status(200).json(rentData);
  } catch (err) {
    next(err);
  }
};

const deleteRent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Rent.destroy({ where: { id } });
    res.status(200).json({ message: "Rent deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserRent, deleteRent };
