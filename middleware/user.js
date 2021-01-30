export default function ({ store, redirect }) {
  // If the user is not authenticated admin
  let token = localStorage.getItem('token');
  if (!token) {
    console.log("Blocked by Middleware")
    return redirect('/login')
  }
  let user = localStorage.getItem('user');
  if (!user) {
    console.log("Blocked by Middleware")
    return redirect('/login')
  }
}