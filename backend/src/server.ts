import app from "./app";

const PORT = (process.env.PORT || 3000) as number;
const HOST = '0.0.0.0'; // 👈 allows all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});