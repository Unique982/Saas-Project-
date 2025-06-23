import bcrypt from "bcrypt";
const generatedRandomPassword = (teacherName: string) => {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  const passwordData = {
    hashedVersion: bcrypt.hashSync(`${randomNumber}_${teacherName}`, 10), // yo chai table ma data store garna ki lagai
    planVersion: `${randomNumber}_${teacherName}`, // yo chai mail ma sent garna  ko lagai
  };
  return passwordData;
};

export default generatedRandomPassword;
