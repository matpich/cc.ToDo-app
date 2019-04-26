const express = require('express');
const sql = require('mssql');
const Joi = require('joi');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
    const { error } = validateAddCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let request = new sql.Request();
        let id = await request
            .input('CategoryName', sql.NVarChar(50), req.body.name)
            .input('CategoryUserId', sql.Int, req.user.id)
            .output('CategoryId', sql.Int)
            .execute('InsertCategory')
        id = id.output.CategoryId
        return res.send({ id, name: req.body.name });

    } catch (err) {
        next(err);
    }
})

router.put('/:id', auth, async (req, res, next) => {
    let changeOrder = false;
    if (req.query.order) changeOrder = true;

    const { error } = validateEditCategory(req.body, changeOrder);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let request = new sql.Request();
        if (!changeOrder) {
            await request
                .input('CategoryName', sql.NVarChar(50), req.body.name)
                .query(`UPDATE Categories SET CategoryName = @CategoryName WHERE CategoryId = ${req.params.id}`)
            return res.send('Category updated');
        }
        
        if (req.body.prev) {
            let validPrev = await request
                .query(`SELECT 1 FROM Categories WHERE CategoryUserId = '${req.params.id}'`)
            validPrev = validPrev.recordset[0];
            if (!validPrev) return res.status(401).send('Unallowable "prev" value.');
        }

        await request
            .input('CategoryId', req.params.id)
            .input('CategoryUserId', sql.Int, req.user.id)
            .input('CategoryPrev', sql.Int, req.body.prev)
            .execute('UpdateCategoryOrder')
        return res.send('Category order changed');
    }
    catch (err) {
        next(err);
    }
})

router.delete('/:id', auth, async (req, res, next) => {
    try {
        let request = new sql.Request();

        await request
            .input('CategoryId', req.params.id)
            .execute('DeleteCategory')
        return res.send('Category deleted.');
    } catch (err) {
        next(err)
    }
})

function validateAddCategory(category) {
    const schema = {
        name: Joi.string().max(50).required(),
    };
    return Joi.validate(category, schema);
}

function validateEditCategory(category, changeOrder) {
    let schema
    if (changeOrder)
        schema = { prev: Joi.number().allow(null).required() };
    else
        schema = { name: Joi.string().max(50).required() };
    return Joi.validate(category, schema);
}

module.exports = router;