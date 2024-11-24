import React, { forwardRef } from "react";
import PersonalDetail from "../utils/PersonalDetail";
import Education from "../utils/Education";
import Skills from "../utils/Skills";
const Default = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="w-[80%] mx-auto">
      <div ref={ref} className="flex tracking-wide w-[210mm]">
        {/* ============ Top Area End =========== */}
        <div className="left-side w-[35%] bg-[#eef3f3]">
          <div className="headling-area h-[200px] relative text-white overflow-hidden">
            <div className="absolute bottom-0 bg-[#385987] w-[350px] h-full rounded-bl-[40%] rounded-br-[40%] left-[50%] translate-x-[-50%] top-0 flex justify-center">
              <div className="w-[270px] text-center pt-[30px]">
                <h2 className="text-lg font-bold">Thet Tun</h2>
                <p className="text-sm mt-[15px]">Senior Software Developer</p>
              </div>
            </div>
          </div>
          <div className="h-[100px] relative">
            <div className="absolute w-[150px] h-[150px] rounded-full top-[-80%] left-[50%] translate-x-[-50%] ">
              {/* <img
                src="https://thettun.vercel.app/images/profile.jpg"
                alt="profile"
                className="w-full h-full rounded-full outline outline-white"
              /> */}
            </div>
          </div>
          {/* =========== Personal Detail ================ */}
          <div className="p-3">
            <h2 className="font-bold text-[#385987] border-b border-gray-300 pb-2">
              Personal details
            </h2>
            <div className="flex flex-col gap-y-4 mt-4 text-sm ">
              <PersonalDetail type="user" value="Thet Tun" />
              <PersonalDetail type="email" value="thettun1741997@gmail.com" />
              <PersonalDetail type="phone" value="+855 87467403" />
              <PersonalDetail
                type="address"
                value="No. 519, The Bliss Mekong Residence, Phnom Penh"
              />
              <PersonalDetail type="dob" value="April 17, 1997" />
              <PersonalDetail type="gender" value="Male" />
              <PersonalDetail
                type="linkedin"
                value="https://www.linkedin.com/in/thet-tun-81ba69192"
              />
              <PersonalDetail
                type="website"
                value="https://thettun.vercel.app"
              />
            </div>
          </div>
          <Education />
          <Skills />
        </div>
        <div className="right-side w-[65%] bg-white"></div>
      </div>
    </div>
  );
});

export default Default;
