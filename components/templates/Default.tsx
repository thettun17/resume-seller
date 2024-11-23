import React, { forwardRef } from "react";

const Default = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="a4-size">
      <div className="flex w-full bg-red-300 h-full tracking-wide">
        <div className="left-side w-[35%] bg-[#eef3f3] overflow-hidden">
          <div className="headling-area h-[200px] relative text-white">
            <div className="absolute bottom-0 bg-[#385987] w-[300px] h-full rounded-bl-[40%] rounded-br-[40%] left-[50%] translate-x-[-50%] top-0 flex justify-center">
              <div className="w-[270px] text-center pt-[30px]">
                <h2 className="text-lg font-bold">Thet Tun</h2>
                <p className="text-sm mt-[15px]">Senior Software Developer</p>
              </div>
            </div>
          </div>
          <div className="h-[100px] relative">
            {/* <div className="absolute w-[150px] h-[150px] rounded-full bottom-[-30%] left-[50%] translate-x-[-50%] "> */}
            <div className="absolute w-[150px] h-[150px] rounded-full top-[-80%] left-[50%] translate-x-[-50%] ">
              <img
                src="https://thettun.vercel.app/images/profile.jpg"
                alt="profile"
                className="w-full h-full rounded-full outline outline-white"
              />
            </div>
          </div>
          {/* ?============ Top Area End =========== */}
          <div className="p-3 bg-red w-full h-full">
            <h2 className="font-bold text-[#385987]">Personal details</h2>
          </div>
        </div>
        <div className="right-side w-[65%]"></div>
      </div>
    </div>
  );
});

export default Default;
