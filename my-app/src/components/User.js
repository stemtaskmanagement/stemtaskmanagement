export default function User({ userCredentials }) {
  return (
    <div>
      <h1>User Account</h1>
      <h3>User Id: {userCredentials.uid}</h3>
      <h3>User Email: {userCredentials.email}</h3>
    </div>
  );
}
