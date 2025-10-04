import Navigation from "../components/Navigation";

export default function Landing() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Navigation links={[
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" }
      ]} />
    </div>
  );
}