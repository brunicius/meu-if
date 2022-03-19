import { Router } from "express";

const router = Router()

router.get('/', (req, res)=>{
    return res.send('<h1>Phone route</h1>')
})

export default router