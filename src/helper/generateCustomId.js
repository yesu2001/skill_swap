function generateCustomID() {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
  const randomChars = Math.random().toString(36).substr(2, 5); // Get a random string of 5 characters
  const uniqueID = `${timestamp}-${randomChars}`; // Combine timestamp and random characters
  return uniqueID;
}

export default generateCustomID;
