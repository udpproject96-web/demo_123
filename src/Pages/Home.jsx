import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { VscEditorLayout } from "react-icons/vsc";
import { RiEdit2Fill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useForm } from "react-hook-form";

import Footer from "../Component/Footer";
import Header from "../Component/Header";

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("des");
  const [total, setTotal] = useState("des");
  const [single, setSingle] = useState({});
  const [view, setView] = useState("card"); // default card view

  const { register, handleSubmit, reset } = useForm();

  async function fetchData() {
    const ProductData = await axios.get(`${import.meta.env.VITE_API_URL}/Products`);
    setProduct(ProductData.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function trashProduct(id) {
    if (confirm("Do you want delete product")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/Products/${id}`);
      setProduct((prev) => prev.filter((item) => item.id !== id));

      toast.error("Product Deleted!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  async function SingleProduct(id) {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Products/${id}`);
    setSingle(res.data);
    reset(res.data);
  }

  async function editProduct(data) {
    await axios.put(`${import.meta.env.VITE_API_URL}/Products/${single.id}`, data);
    location.reload();
  }

  function sortPrice(order) {
    const sorted = [...product].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setProduct(sorted);
    setPrice(order);
  }

  function sortTotal(order) {
    const sorted = [...product].sort((a, b) =>
      order === "asc" ? a.total - b.total : b.total - a.total
    );
    setProduct(sorted);
    setTotal(order);
  }

  return (
    <>
      <Header />

      <div className="container p-0">

        {/* Add Product */}
        <Link to="addProduct">
          <button className="btn btn-primary mt-5 w-100 py-2 fs-4">
            Add Product
          </button>
        </Link>

        {/* Desktop View Toggle */}
        <div className="mt-4 d-none d-md-flex justify-content-center">
          <div className="btn-group">
            <button
              className={`btn ${view === "table" ? "btn-dark" : "btn-secondary"}`}
              onClick={() => setView("table")}
            >
              <VscEditorLayout /> Table
            </button>

            <button
              className={`btn ${view === "card" ? "btn-dark" : "btn-secondary"}`}
              onClick={() => setView("card")}
            >
              <GrOverview /> Cards
            </button>
          </div>
        </div>

        {/* CARD VIEW */}
        {view === "card" && (
          <div className="row g-4 mt-5 justify-content-center">
            {product.map((ele, index) => (
              <div className="product-card col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <img src={ele.image} className="product-img" alt="" />

                <div className="product-info">
                  <h5 className="product-title">{ele.product_name}</h5>
                  <p className="product-category">Category: {ele.category}</p>
                  <p className="product-price">$ {ele.price}</p>
                  <p className="product-desc">{ele.description.slice(0, 50)}...</p>
                </div>

                <div className="btn-group w-100">
                  <button className="btn btn-primary" onClick={() => navigate(`/single-product/${ele.id}`)}>
                    <GrOverview />
                  </button>

                  <button className="btn btn-danger" onClick={() => trashProduct(ele.id)}>
                    <MdDelete />
                  </button>

                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => SingleProduct(ele.id)}
                  >
                    <VscEditorLayout />
                  </button>

                  <button className="btn btn-info" onClick={() => navigate(`/addProduct/${ele.id}`)}>
                    <RiEdit2Fill />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TABLE VIEW */}
        {view === "table" && (
          <div className="table-responsive mt-5 d-none d-md-block">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>
                    Price
                    {price === "des" ? (
                      <button className="sort-btn" onClick={() => sortPrice("asc")}>↓</button>
                    ) : (
                      <button className="sort-btn" onClick={() => sortPrice("des")}>↑</button>
                    )}
                  </th>

                  <th>
                    Total
                    {total === "des" ? (
                      <button className="sort-btn" onClick={() => sortTotal("asc")}>↓</button>
                    ) : (
                      <button className="sort-btn" onClick={() => sortTotal("des")}>↑</button>
                    )}
                  </th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {product.map((ele, index) => (
                  <tr key={ele.id}>
                    <td>{index + 1}</td>
                    <td><img src={ele.image} className="table-img" /></td>
                    <td>{ele.product_name}</td>
                    <td>$ {ele.price}</td>
                    <td>{ele.total}</td>

                    <td>
                      <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => navigate(`/single-product/${ele.id}`)}>
                          <GrOverview />
                        </button>

                        <button className="btn btn-info" onClick={() => navigate(`/addProduct/${ele.id}`)}>
                          <RiEdit2Fill />
                        </button>

                        <button className="btn btn-danger" onClick={() => trashProduct(ele.id)}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        <Footer />
      </div>

      {/* EDIT MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" data-bs-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit(editProduct)}>
              <div className="modal-header">
                <h5>Edit Product</h5>
                <button className="btn-close" type="button" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <label>Image URL</label>
                <input className="form-control mb-2" {...register("image")} />

                <label>Product Name</label>
                <input className="form-control mb-2" {...register("product_name")} />

                <label>Price</label>
                <input className="form-control mb-2" {...register("price")} />

                <label>Total</label>
                <input className="form-control mb-2" {...register("total")} />

                <label>Description</label>
                <textarea className="form-control" {...register("description")} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary w-100">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer transition={Bounce} theme="dark" />

      {/* INLINE CSS FIXED: MUST BE A STRING */}
      <style>{`
        .product-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          background: #fff;
          transition: 0.3s;
          box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 14px rgba(0,0,0,0.12);
        }

        .product-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .product-info {
          padding: 12px;
        }

        .product-title {
          font-weight: 600;
          text-transform: capitalize;
        }

        .product-category {
          font-size: 13px;
          color: #777;
        }

        .product-price {
          color: green;
          font-size: 18px;
          font-weight: bold;
        }

        .product-desc {
          font-size: 13px;
          color: #666;
        }

        .table-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 6px;
        }

        .sort-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 18px;
          margin-left: 6px;
        }

        @media (max-width: 576px) {
          .product-img {
            height: 180px;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
