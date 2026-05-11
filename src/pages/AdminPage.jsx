// 관리자 페이지 파일
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getAdminOrders,
  getAdminUsers,
  updateAdminProduct,
} from "../api/admin";
import { getProducts } from "../api/products";

const getLoginUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loginUser"));
  } catch {
    return null;
  }
};

function AdminPage() {
  const navigate = useNavigate();
  const loginUser = getLoginUser();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [productForm, setProductForm] = useState({
    price: "",
    sale: "",
    stock: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // ADMIN 권한일 때 주문/회원/상품 데이터 동시 조회
    if (!loginUser || loginUser.role !== "ADMIN") {
      return;
    }

    Promise.all([getAdminOrders(), getAdminUsers(), getProducts()])
      .then(([ordersData, usersData, productsData]) => {
        setOrders(ordersData);
        setUsers(usersData);
        setProducts(productsData);
        setMessage("");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, [loginUser]);

  useEffect(() => {
    // 프론트 권한 확인 후 백엔드 API에서 role 재검사
    if (loginUser && loginUser.role !== "ADMIN") {
      alert("관리자 권한이 필요합니다.");
      navigate("/", { replace: true });
    }
  }, [loginUser, navigate]);

  if (!loginUser) {
    return <Navigate to="/login" replace />;
  }

  if (loginUser.role !== "ADMIN") {
    return null;
  }

  const handleProductFormChange = (event) => {
    const { name, value } = event.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductSelect = (productId) => {
    // 상품 선택 시 현재 가격/할인율/재고를 수정 폼에 표시
    setSelectedProductId(productId);

    const product = products.find((item) => String(item.id) === productId);

    if (!product) {
      setProductForm({ price: "", sale: "", stock: "" });
      return;
    }

    setProductForm({
      price: String(product.price),
      sale: String(product.sale),
      stock: String(product.stock ?? 100),
    });
  };

  const handleProductUpdate = async (event) => {
    event.preventDefault();

    if (!selectedProductId) {
      setMessage("수정할 상품을 선택해주세요.");
      return;
    }

    try {
      // 관리자 상품 수정은 가격, 할인율, 재고만 보내도록 범위를 좁힘
      // 입력값 숫자 변환 후 관리자 상품 수정 API 요청
      const updatedProduct = await updateAdminProduct({
        productId: selectedProductId,
        price: Number(productForm.price),
        sale: Number(productForm.sale),
        stock: Number(productForm.stock),
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product,
        ),
      );
      setMessage("상품 정보가 수정되었습니다.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-sm font-bold text-blue-700">Admin</p>
        <h1 className="mt-3 text-3xl font-bold">관리자 페이지</h1>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          <AdminTab
            label="모든 주문"
            isActive={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
          <AdminTab
            label="회원 목록"
            isActive={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <AdminTab
            label="상품 수정"
            isActive={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          />
        </div>

        {message && (
          <p className="mt-5 rounded-[4px] bg-gray-100 px-4 py-3 text-sm font-bold">
            {message}
          </p>
        )}

        {activeTab === "orders" && <AdminOrders orders={orders} />}
        {activeTab === "users" && <AdminUsers users={users} />}
        {activeTab === "products" && (
          <AdminProducts
            products={products}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            onProductSelect={handleProductSelect}
            productForm={productForm}
            onChange={handleProductFormChange}
            onSubmit={handleProductUpdate}
          />
        )}
      </div>
    </div>
  );
}

function AdminTab({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`h-10 rounded-full px-5 text-sm font-bold ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function AdminOrders({ orders }) {
  return (
    <section className="mt-6 grid gap-4">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-[4px] border border-gray-200 px-5 py-5"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-bold">주문 #{order.id}</p>
              <p className="mt-1 text-sm text-gray-500">
                {order.receiverName} · {order.shippingMethod}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {order.address} {order.detailAddress}
              </p>
              <p className="mt-3 text-sm font-bold text-gray-700">
                {order.items
                  .map((item) => `${item.productTitle} ${item.quantity}개`)
                  .join(", ")}
              </p>
            </div>
            <p className="text-xl font-bold">
              ₩{order.totalPrice.toLocaleString()}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}

function AdminUsers({ users }) {
  return (
    <section className="mt-6 grid gap-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="grid gap-2 rounded-[4px] border border-gray-200 px-5 py-4 md:grid-cols-[1fr_1fr_140px]"
        >
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm font-bold">{user.role}</p>
        </div>
      ))}
    </section>
  );
}

function AdminProducts({
  products,
  selectedProductId,
  onProductSelect,
  productForm,
  onChange,
  onSubmit,
}) {
  return (
    <section className="mt-6 grid gap-6 md:grid-cols-[360px_1fr]">
      <div className="rounded-[4px] border border-gray-200 px-5 py-5">
        <label className="block">
          <span className="text-sm font-bold">수정할 상품</span>
          <select
            value={selectedProductId}
            onChange={(event) => onProductSelect(event.target.value)}
            className="mt-2 h-12 w-full rounded-[4px] border border-gray-400 px-3"
          >
            <option value="">상품 선택</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form
        className="grid gap-4 rounded-[4px] border border-gray-200 px-5 py-5"
        onSubmit={onSubmit}
      >
        <AdminInput
          label="가격"
          name="price"
          value={productForm.price}
          onChange={onChange}
        />
        <AdminInput
          label="할인율"
          name="sale"
          value={productForm.sale}
          onChange={onChange}
        />
        <AdminInput
          label="재고"
          name="stock"
          value={productForm.stock}
          onChange={onChange}
        />
        <button
          type="submit"
          className="h-12 rounded-full bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
        >
          상품 수정하기
        </button>
      </form>
    </section>
  );
}

function AdminInput({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <input
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        className="mt-2 h-12 w-full rounded-[4px] border border-gray-400 px-4 outline-none focus:border-black"
      />
    </label>
  );
}

export default AdminPage;
