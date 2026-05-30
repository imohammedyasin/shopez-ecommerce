import React, { useContext, useEffect, useState } from 'react';
import '../../styles/IndividualProduct.css';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const IndividualProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(GeneralContext);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productCarouselImg1, setProductCarouselImg1] = useState('');
  const [productCarouselImg2, setProductCarouselImg2] = useState('');
  const [productCarouselImg3, setProductCarouselImg3] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/fetch-product-details/${id}`);
      const data = response.data;
      setProductName(data.title);
      setProductDescription(data.description);
      setProductMainImg(data.mainImg);
      setProductCarouselImg1(data.carousel?.[0] || '');
      setProductCarouselImg2(data.carousel?.[1] || '');
      setProductCarouselImg3(data.carousel?.[2] || '');
      setProductSizes(data.sizes || []);
      setProductPrice(data.price);
      setProductDiscount(data.discount);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const [productQuantity, setProductQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const buyNow = async () => {
    if (!name || !email || !mobile || !address || !pincode || !paymentMethod) {
      alert("Please fill all checkout fields");
      return;
    }
    if (!size && productSizes.length > 0) {
      alert("Please select a size");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      navigate('/auth');
      return;
    }

    try {
      await axios.post(
        '/api/orders/buy-product',
        {
          name, email, mobile, address, pincode,
          title: productName, description: productDescription,
          mainImg: productMainImg, size, quantity: productQuantity,
          price: productPrice, discount: productDiscount,
          paymentMethod, orderDate: new Date()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed!!');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || "Order failed!!");
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      navigate('/auth');
      return;
    }
    if (!size && productSizes.length > 0) {
      alert("Please select a size");
      return;
    }

    try {
      await axios.post('/api/cart/add-to-cart', {
        title: productName,
        description: productDescription,
        mainImg: productMainImg,
        size,
        quantity: productQuantity,
        price: productPrice,
        discount: productDiscount
      });
      alert("Product added to cart!!");
      fetchCartCount();
      navigate('/cart');
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed!!");
    }
  };

  return (
    <div className="IndividualProduct-page">
      <span onClick={() => navigate('')}> <HiOutlineArrowSmLeft /> <p>back</p></span>

      <div className="IndividualProduct-body">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={productCarouselImg1} className="d-block w-100" alt="Product view 1" />
            </div>
            <div className="carousel-item">
              <img src={productCarouselImg2} className="d-block w-100" alt="Product view 2" />
            </div>
            <div className="carousel-item">
              <img src={productCarouselImg3} className="d-block w-100" alt="Product view 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="IndividualProduct-data">
          <h3>{productName}</h3>
          <p>{productDescription}</p>

          {productSizes.length > 0 && (
            <span>
              <label htmlFor="productSize">Choose size</label>
              <select name="productSize" id="productSize" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Select</option>
                {productSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </span>
          )}

          <span>
            <label htmlFor="productQuantity">Quantity</label>
            <select name="productQuantity" id="productQuantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </span>

          <span>
            <h5><b>Price: </b> &#8377; {parseInt(productPrice - (productPrice * productDiscount) / 100)}</h5>
            <s>{productPrice}</s>
            <p>({productDiscount}% off)</p>
          </span>
          <p className="delivery-date">Free delivery in 5 days</p>

          <div className="productBuyingButtons">
            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">Buy now</button>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Checkout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="checkout-address">
                <h4>Details</h4>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput1" value={name} onChange={(e) => setName(e.target.value)} required />
                  <label htmlFor="floatingInput1">Name *</label>
                </div>
                <section>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput3" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    <label htmlFor="floatingInput3">Mobile *</label>
                  </div>
                  <div className="form-floating mb-3 span-child-1">
                    <input type="email" className="form-control" id="floatingInput2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="floatingInput2">Email *</label>
                  </div>
                </section>
                <section>
                  <div className="form-floating mb-3 span-child-1">
                    <input type="text" className="form-control" id="floatingInput6" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <label htmlFor="floatingInput6">Address *</label>
                  </div>
                  <div className="form-floating mb-3 span-child-2">
                    <input type="text" className="form-control" id="floatingInput7" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                    <label htmlFor="floatingInput7">Pincode *</label>
                  </div>
                </section>
              </div>

              <div className="checkout-payment-method">
                <h4>Payment method</h4>
                <div className="form-floating mb-3">
                  <select className="form-select form-select-md mb-3" id="floatingInput8" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                    <option value="">Choose payment method</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="card">Card Payments</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                  <label htmlFor="floatingInput8">Payment Method *</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={buyNow}>Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
