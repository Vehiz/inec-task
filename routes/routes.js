import express from 'express'
import { pollingUnit, storeResult, sumResult } from '../controllers/pollingUnit.js'

const router = express.Router()

router.get('/polling-unit/:id', pollingUnit) // individual polling unit
router.get('/summed-result', sumResult) //route to sum result
router.post('/new-polling-unit', storeResult) // route to store result


export default router