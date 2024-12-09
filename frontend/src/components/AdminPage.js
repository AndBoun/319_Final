import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const AdminPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data, endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Product added successfully");
        reset(); // Reset the form fields
        setServerError(''); // Clear any previous errors
        alert('Product added successfully');
        navigate('/'); 
      } else {
        const result = await response.json();
        setServerError(result.error);
        console.log("Failed to add product:", result.error);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setServerError('Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Page</h2>
      <form onSubmit={handleSubmit((data) => onSubmit(data, 'add-outerwear'))}>
        <h3>Add Outerwear</h3>
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input className="form-control" {...register("item", { required: "Item is required" })} />
          {errors.item && <div className="invalid-feedback">{errors.item.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input className="form-control" {...register("productDescription", { required: "Description is required" })} />
          {errors.productDescription && <div className="invalid-feedback">{errors.productDescription.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" {...register("price", { required: "Price is required" })} />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" {...register("image", { required: "Image URL is required" })} />
          {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Attribute</label>
          <input className="form-control" {...register("attribute", { required: "Attribute is required" })} />
          {errors.attribute && <div className="invalid-feedback">{errors.attribute.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add Outerwear</button>
      </form>

      <form onSubmit={handleSubmit((data) => onSubmit(data, 'add-pants'))}>
        <h3>Add Pants</h3>
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input className="form-control" {...register("item", { required: "Item is required" })} />
          {errors.item && <div className="invalid-feedback">{errors.item.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input className="form-control" {...register("productDescription", { required: "Description is required" })} />
          {errors.productDescription && <div className="invalid-feedback">{errors.productDescription.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" {...register("price", { required: "Price is required" })} />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" {...register("image", { required: "Image URL is required" })} />
          {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Attribute</label>
          <input className="form-control" {...register("attribute", { required: "Attribute is required" })} />
          {errors.attribute && <div className="invalid-feedback">{errors.attribute.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add Pants</button>
      </form>

      {serverError && <div className="alert alert-danger mt-3">{serverError}</div>}
    </div>
  );
};

export default AdminPage;