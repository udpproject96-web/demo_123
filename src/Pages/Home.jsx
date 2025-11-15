import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { VscEditorLayout } from "react-icons/vsc";
import { RiEdit2Fill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useForm } from "react-hook-form";
// import { Modal } from "bootstrap/dist/js/bootstrap.min";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import "../assets/css/header.css";
import { FaTableCells } from "react-icons/fa6";
import { IoIdCardSharp } from "react-icons/io5";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("des");
  const [total, setTotal] = useState("des");
  const [single, setSingle] = useState({});

  const { register, handleSubmit, reset } = useForm();

  //   Function for Fetch All Products
  async function fetchData() {
    const ProductData = await axios.get(
      `${import.meta.env.VITE_API_URL}/Products`
    );
    setProduct(ProductData.data);
  }

  useEffect(() => {
    document.querySelector(".tableView").style.display = "none";
    fetchData();
  }, []);

  //   Function For Delete Products
  async function trashProduct(id) {
    if (confirm("Do you want delete product")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/Products/${id}`);
      const UpdatedProduct = product.filter((ele) => {
        return ele.id !== id;
      });
      setProduct(UpdatedProduct);
      const notify = () =>
        toast.error("Product Deleted..!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

      notify();
    }
  }

  //Function for Fetch Single Produst and Send to Form
  async function SingleProduct(id) {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/Products/${id}`
    );
    setSingle(res.data);
    reset(res.data);
  }

  //Function for Update Product in Modal
  async function editProduct(data) {
    await axios
      .put(`${import.meta.env.VITE_API_URL}/Products/${single.id}`, data)
      .then((res) => {
        window.location.reload();
        toast.success("Product Deleted..!");
      })
      .catch((err) => console.log(err));
  }

  // Function sort base Price
  function sortPrice(order) {
    const SortedPrice = product.sort((a, b) => {
      if (order == "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProduct(SortedPrice);
    setPrice(order);
  }

  function sortTotal(order) {
    const SortedTotal = product.sort((a, b) => {
      if (order == "asc") {
        return a.total - b.total;
      } else {
        return b.total - a.total;
      }
    });

    setProduct(SortedTotal);
    setTotal(order);
  }

  // Show data  in Table or Card View
  function show(name) {
    if (name == "table") {
      document.querySelector(".tableView").style.display = "";
      document.querySelector(".cardView").style.display = "none";

      // Bg-color add
      document.querySelector(".cardBtn").classList.add("bg-secondary");
      document.querySelector(".tableBtn").classList.add("bg-dark");
      // Bg-color remove
      document.querySelector(".cardBtn").classList.remove("bg-dark");
      document.querySelector(".tableBtn").classList.remove("bg-secondary");
    } else {
      document.querySelector(".tableView").style.display = "none";
      document.querySelector(".cardView").style.display = "flex";

      // Bg-color add
      document.querySelector(".cardBtn").classList.add("bg-dark");
      document.querySelector(".tableBtn").classList.add("bg-secondary");
      // Bg-color remove
      document.querySelector(".cardBtn").classList.remove("bg-secondary");
      document.querySelector(".tableBtn").classList.remove("bg-dark");
    }
  }

  return (
    <>
      {/* Header */}
      <Header />
      {/* End Header */}

      <div className="container p-0">
        {/* Buttonn for Add Product */}
        <Link to="addProduct">
          <button className="btn btn-primary mt-5 w-100 py-2 fs-4">
            Add Product
          </button>
        </Link>
        {/* Buttonn for Add Product */}

        {/* Toggle Button for Table view or Card View */}
        <div>
          <div className="btn-group mt-5">
            <button
              className="tableBtn btn btn-secondary"
              onClick={() => {
                show("table");
              }}
              data-toggle="tooltip"
              data-placement="top"
              title="Show Table View"
            >
              <FaTableCells />
            </button>
            <button
              className="cardBtn btn btn-dark"
              onClick={() => {
                show("card");
              }}
              data-toggle="tooltip"
              data-placement="top"
              title="Show Card View"
            >
              <IoIdCardSharp />
            </button>
          </div>
        </div>
        {/* Toggle Button for Table view or Card View */}

        {/* Card View */}
        <div className="cardView row g-4 mt-5 justify-content-center">
          {product.map((ele, index) => (
            <div
              className="col-5 col-sm-5 col-md-4 col-lg-3 border border-1 shadow p-0 mb-4 rounded-3"
              key={index}
            >
              <img
                src={ele.image}
                alt=""
                width="100%"
                height={250}
                className="rounded-3"
              />
              <div className="card-body px-2">
                <h3
                  className="text-capitalize overflow-hidden"
                  style={{ height: "40px" }}
                >
                  name : {ele.product_name}
                </h3>
                <p className="text-capitalize">category : {ele.category}</p>
                <p className="text-capitalize">price : {ele.price}</p>
                <p
                  className="text-capitalize overflow-hidden"
                  style={{ height: "40px" }}
                >
                  desc : {ele.description}
                </p>
              </div>
              <div className="btn-group w-100">
                <button
                  className="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="See More Detail"
                  onClick={() => navigate(`/single-product/${ele.id}`)}
                >
                  <GrOverview />
                </button>
                <button
                  className="btn btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete Product"
                  data-bs-toggle="modal"
                  onClick={() => {
                    trashProduct(ele.id);
                  }}
                  //   data-bs-target="#deletemodal"
                >
                  <MdDelete />
                </button>
                <button
                  className="btn btn-warning"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit Product"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    SingleProduct(ele.id);
                  }}
                >
                  <VscEditorLayout />
                </button>
                <button
                  className="btn btn-info"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit Product"
                  onClick={() => {
                    navigate(`/addProduct/${ele.id}`);
                  }}
                >
                  <RiEdit2Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* End Card View */}

        {/* Table View */}
        <div className="tableDiv w-100 mt-5">
          <table className="tableView table w-100">
            <thead>
              <tr>
                <th className="text-capitalize">sr.no</th>
                <th className="text-capitalize">product image</th>
                <th className="text-capitalize">product name</th>
                <th className="text-capitalize">
                  price ($)
                  {price == "des" ? (
                    <button
                      className="btn bg-transparent p-0"
                      onClick={() => {
                        sortPrice("asc");
                      }}
                    >
                      <FaLongArrowAltDown />
                    </button>
                  ) : (
                    <button
                      className="btn bg-transparent p-0"
                      onClick={() => {
                        sortPrice("des");
                      }}
                    >
                      <FaLongArrowAltUp />
                    </button>
                  )}
                </th>
                <th className="text-capitalize">
                  total product
                  {total == "des" ? (
                    <button
                      className="btn bg-transparent p-0"
                      onClick={() => {
                        sortTotal("asc");
                      }}
                    >
                      <FaLongArrowAltDown />
                    </button>
                  ) : (
                    <button
                      className="btn bg-transparent p-0"
                      onClick={() => {
                        sortTotal("des");
                      }}
                    >
                      <FaLongArrowAltUp />
                    </button>
                  )}
                </th>
                <th className="text-capitalize">actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((ele, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img src={ele.image} alt="" width={70} height={70} />
                  </td>
                  <td className="text-capitalize">{ele.product_name}</td>
                  <td className="text-info fw-bolder">$ {ele.price}</td>
                  <td>{ele.total}</td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-primary" onClick={() => navigate(`/single-product/${ele.id}`)}>
                        <GrOverview />
                      </button>
                      <button className="btn btn-info">
                        <RiEdit2Fill />
                      </button>
                      <button className="btn btn-danger" onClick={() => {trashProduct(ele.id);}}>
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* End Table View */}
      </div>

      <Footer />

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={handleSubmit(editProduct)}>
                <label htmlFor="image" className="form-label text-capitalize">
                  Product image/URl
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("image")}
                  id="image"
                />
                <label htmlFor="name" className="form-label text-capitalize">
                  Product name
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("product_name")}
                  id="name"
                />
                <label htmlFor="price" className="form-label text-capitalize">
                  Product price
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("price")}
                  id="price"
                />
                <label htmlFor="total" className="form-label text-capitalize">
                  total Product
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("total")}
                  id="total"
                />
                <label
                  htmlFor="description"
                  className="form-label text-capitalize"
                >
                  description
                </label>
                <textarea
                  type="text"
                  className="form-control mb-2"
                  {...register("description")}
                  id="description"
                />

                <button className="btn btn-primary w-100">Save changes</button>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* <!--Delet Modal --> */}
      <div
        className="modal fade"
        id="deletemodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Delete Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>are you sure to delete this product...?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-capitalize"
                data-bs-dismiss="modal"
              >
                cancle
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  trashProduct(ele.id);
                }}
              >
                Comfirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tostify */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default Home;
