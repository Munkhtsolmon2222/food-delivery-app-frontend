import { Logo } from "./logo";
export function Footer() {
  return (
    <div className="mt-[50px]">
      <div className="bg-[#18181B] h-[755px] w-screen">
        <div className="bg-[#18181B] h-[60px] w-screen"></div>
        <div className="bg-red-500 h-20 text-[32px] flex gap-9 pl-24">
          <p>Fresh Fast Delivered</p>
          <p>Fresh Fast Delivered</p>
          <p>Fresh Fast Delivered</p>
          <p>Fresh Fast Delivered</p>
        </div>
        <div className=" grid grid-cols-5 gap-5 mt-20 ml-16">
          <Logo />
          <div>
            <div className="text-gray-500">NOMNOM</div>
            <p className="text-white">Home</p>
            <p className="text-white">Contact us</p>
            <p className="text-white">Delivery zone</p>
          </div>
          <div>
            <div className="text-gray-500"> MENU</div>
            <p className="text-white">Appetizers</p>
            <p className="text-white">Salads </p>
            <p className="text-white">Pizzas</p>
            <p className="text-white">Lunch favorites</p>
            <p className="text-white"> Main dishes</p>
          </div>
          <div>
            <p className="text-gray-500">Side dish </p>
            <p className="text-white">Brunch </p>
            <p className="text-white">Desserts</p>
            <p className="text-white"> Beverages</p>
            <p className="text-white"> Fish & Sea foods </p>
          </div>
          <div>
            <div className="text-gray-500"> FOLLOW US</div>

            <div className="flex gap-5">
              <img src="./Facebook.png" alt="" />
              <img src="./Instagram.png" alt="" />
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-t-gray-500 h-20 mt-[104px]  ml-16 text-gray-500">
          <div className="mt-16 flex gap-32">
            <p className="text-gray-500">Copy right 2024 © Nomnom LLC</p>
            <p className="text-gray-500">Privacy policy </p>
            <p className="text-gray-500">Terms and conditions</p>
            <p className="text-gray-500">Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}