import React, { useState } from 'react';
import styles from './form.module.css'
import axios from 'axios';


const Form = ({ handleSubmit, getProducts, handleChange, product }) => {





    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formDiv}>
                <label>Article</label>
                <input onChange={handleChange} type="text" name="article" placeholder='Insert article...' value={product.article}/>
            </div>
            <div className={styles.formDiv}>
                <label>Price</label>
                <input onChange={handleChange} type="number" name="price" placeholder='Insert price...' value={product.price} />
            </div>
            <div className={styles.formDiv}>
                <label>Stock</label>
                <input onChange={handleChange} type="number" name="stock" placeholder='Insert stock...' value={product.stock}/>
            </div>
            <div className={styles.formDiv}>
                <label>Tag</label>
                <input onChange={handleChange} type="text" name="tag" placeholder='Insert tag...' value={product.tag}/>
            </div>
            <button className={styles.formButton} type="submit">Submit</button>
        </form>
    )
}

export default Form