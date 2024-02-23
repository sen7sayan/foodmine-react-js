import {Router} from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import {OrderModel} from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

const router = Router();
router.use(auth);

router.post(
    '/create',auth,
handler(async(req,res)=>{
    try {
        const order = req.body;
      if(order.items.length<=0) res.status(BAD_REQUEST).send('Cart is empty!!');
      
      await OrderModel.deleteOne({
          user: req.user.id,
          status: OrderStatus.NEW,
      })

      const newOrder = new OrderModel({...order, user: req.user.id})
      await newOrder.save();
      res.send(newOrder);

    } catch (error) {
      console.log(error);
    }
})
)

router.put('/pay',
handler(async(req,res)=>{
  const {paymentId} = req.body;
  const order = await getNewOrderForCurrentUser(req);
  
  if(!order){
    res.status(BAD_REQUEST).send('Order not found');
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
}))

router.get(
    '/newOrderForCurrentUser',
    handler(async (req, res) => {
     try {
     
        const order = await getNewOrderForCurrentUser(req);
       
        if (order){
         return res.send(order);
        } 
        else{
          return res.status(BAD_REQUEST).send();
        } 
     } catch (error) {
      console.log(error);
     }
    })
  );


const getNewOrderForCurrentUser = async req =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
}).populate('user');


export default router;