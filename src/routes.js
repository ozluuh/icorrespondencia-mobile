import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import SignUp from './screens/SignUp';

export default [
  {
    name: 'Login',
    component: Login,
    options:{
      headerShown: false
    }
  },
  {
    name: 'SignUp',
    component: SignUp,
    options:{
      headerShown: false
    }
  },
  {
    name: 'Home',
    component: Home,
    options:{
      headerShown: false
    }
  },
  {
    name: 'Profile',
    component: Profile,
  },
];
