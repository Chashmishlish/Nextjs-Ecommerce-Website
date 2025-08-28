import bcrypt from "bcryptjs";

const plain = "husban";

bcrypt.hash(plain, 10).then(newHash => {
  console.log("New Hash:", newHash);
  bcrypt.compare(plain, newHash).then(res => console.log("Match with new hash?", res));
});
