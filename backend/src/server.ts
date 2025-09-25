import app from "./app";

const PORT = (process.env.PORT || 3000) as number;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  
});