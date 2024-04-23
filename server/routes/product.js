const express = require('express');
const product =require('../models/Product')

const { addProduct, updateProduct, deleteProduct, getProduct, getProducts,like } = require('../controllers/product');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

const router = express.Router();
const multer = require('multer')
const path =require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now()+'_' + file.originalname)
      }
})

const upload = multer({storage:storage})


// POST => /api/products
/* router.post('/', verifyTokenAndAdmin, addProduct); */
router.post('/',upload.single('pdf'), addProduct  );

// PATCH => /api/products/:id
router.put('/:id', updateProduct);

// DELETE => /api/products/:id
router.delete('/:id', deleteProduct);

// GET => /api/products/:id
router.get('/:id', getProduct);

router.put("/:id/like",like)

// GET => /api/products
router.get('/', getProducts);
module.exports = router;