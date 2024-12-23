import pg from 'pg';

export const login = (req, res) => {
    // Your login logic here

    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);
  
    res.send('Login successful');
};
  
export const register = (req, res) => {

    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);

    // Your register logic here
    res.send('Register successful');
};