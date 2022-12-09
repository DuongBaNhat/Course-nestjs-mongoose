export const getConfig = () => {
  return {
    // developement
    PORT: '3000',
    SECRET_KEY: process.env.SECRET_KEY,
    MONGO_URL:
      'mongodb+srv://nhat:11223344@cluster0.xe8phgv.mongodb.net/db1?retryWrites=true&w=majority',
    MAX_AGE_SESSION: 1000 * 60 * 60, //1 hour
  };
};
