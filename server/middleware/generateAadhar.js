const getNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateAadharNumber = () => {
  return (
    getNumbers(2, 9) +
    "" +
    getNumbers(99, 1000) +
    " " +
    getNumbers(999, 10000) +
    " " +
    getNumbers(999, 10000)
  );
};

exports.GenerateAadhar = async (req, res, next) => {
  const aadharNumber = generateAadharNumber();
  req.body = { ...req.body, aadhar: aadharNumber };
  next();
};
