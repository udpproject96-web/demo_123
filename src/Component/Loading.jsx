import { FourSquare } from "react-loading-indicators"
const Loading = () => {
  return (
    <>
      <div className="col-6 col-sm-2 col-md-3 col-lg-2 m-auto mt-5 p-5">
        <FourSquare color="#1e769a" speedPlus={3} size="large" text="fetch products" textColor="#000000" />
      </div>
    </>
  )
}

export default Loading
