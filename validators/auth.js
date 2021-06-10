import {check} from 'express-validator'

const userSignUpValidator = [

    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required Bro..'),
    check('email')
        .isEmail()
        .withMessage('Email must be valid Bro..'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be valid 6 character long Bro..')

]

export default userSignUpValidator;