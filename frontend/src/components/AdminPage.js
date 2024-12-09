import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const AdminPage = () => {
  const outerwearForm = useForm();
  const pantsForm = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data, endpoint, formReset) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Item added successfully");
        formReset(); // Reset the specific form fields
        setServerError(''); // Clear any previous errors
        alert('Item added successfully');
        navigate('/');
      } else {
        const result = await response.json();
        setServerError(result.error || 'Failed to add item');
        console.log("Failed to add item:", result.error);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setServerError('Failed to add item');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Page</h2>
      
      {/* Add Outerwear Form */}
      <form
        onSubmit={outerwearForm.handleSubmit((data) =>
          onSubmit(data, 'add-outerwear', outerwearForm.reset)
        )}
      >
        <h3>Add Outerwear</h3>
        {/* Outerwear Fields */}
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input className="form-control" {...outerwearForm.register("item", { required: "Item is required" })} />
          {outerwearForm.formState.errors.item && (
            <div className="invalid-feedback">{outerwearForm.formState.errors.item.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input className="form-control" {...outerwearForm.register("productDescription", { required: "Description is required" })} />
          {outerwearForm.formState.errors.productDescription && (
            <div className="invalid-feedback">{outerwearForm.formState.errors.productDescription.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" {...outerwearForm.register("price", { required: "Price is required" })} />
          {outerwearForm.formState.errors.price && (
            <div className="invalid-feedback">{outerwearForm.formState.errors.price.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" {...outerwearForm.register("image", { required: "Image URL is required" })} />
          {outerwearForm.formState.errors.image && (
            <div className="invalid-feedback">{outerwearForm.formState.errors.image.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Attribute</label>
          <input className="form-control" {...outerwearForm.register("attribute", { required: "Attribute is required" })} />
          {outerwearForm.formState.errors.attribute && (
            <div className="invalid-feedback">{outerwearForm.formState.errors.attribute.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Add Outerwear</button>
      </form>

      {/* Add Pants Form */}
      <form
        onSubmit={pantsForm.handleSubmit((data) =>
          onSubmit(data, 'add-pants', pantsForm.reset)
        )}
      >
        <h3>Add Pants</h3>
        {/* Pants Fields */}
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input className="form-control" {...pantsForm.register("item", { required: "Item is required" })} />
          {pantsForm.formState.errors.item && (
            <div className="invalid-feedback">{pantsForm.formState.errors.item.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input className="form-control" {...pantsForm.register("productDescription", { required: "Description is required" })} />
          {pantsForm.formState.errors.productDescription && (
            <div className="invalid-feedback">{pantsForm.formState.errors.productDescription.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" {...pantsForm.register("price", { required: "Price is required" })} />
          {pantsForm.formState.errors.price && (
            <div className="invalid-feedback">{pantsForm.formState.errors.price.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" {...pantsForm.register("image", { required: "Image URL is required" })} />
          {pantsForm.formState.errors.image && (
            <div className="invalid-feedback">{pantsForm.formState.errors.image.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Attribute</label>
          <input className="form-control" {...pantsForm.register("attribute", { required: "Attribute is required" })} />
          {pantsForm.formState.errors.attribute && (
            <div className="invalid-feedback">{pantsForm.formState.errors.attribute.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Add Pants</button>
      </form>

      {serverError && <div className="alert alert-danger mt-3">{serverError}</div>}
    </div>
  );
};

export default AdminPage;
