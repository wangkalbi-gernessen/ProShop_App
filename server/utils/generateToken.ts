import jwt from 'jsonwebtoken';

const generateToken = (id: any) => {
  return jwt.sign({ id }, (process.env.JWT_SECRET as any), { expiresIn: '30d' }); 
}

export default generateToken;