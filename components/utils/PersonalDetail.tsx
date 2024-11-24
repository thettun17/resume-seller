import Link from "next/link";
import {
  FaRegUser,
  FaEnvelope,
  FaHome,
  FaPhone,
  FaRegCalendarAlt,
  FaTransgender,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

type PersonalType =
  | "user"
  | "email"
  | "phone"
  | "address"
  | "dob"
  | "gender"
  | "linkedin"
  | "website";

type Personal = {
  type: PersonalType;
  value: string;
};

const iconMap: Record<PersonalType, IconType> = {
  user: FaRegUser,
  email: FaEnvelope,
  address: FaHome,
  phone: FaPhone,
  dob: FaRegCalendarAlt,
  gender: FaTransgender,
  linkedin: FaLinkedin,
  website: FaLink,
};

export default function PersonalDetail({ type, value }: Personal) {
  const IconComponent = iconMap[type] || FaRegUser;
  const formattedValue =
    type === "linkedin" || type === "website"
      ? value.replace(/^(https?:\/\/)?(www\.)?/, "")
      : value;
  return (
    <>
      <div className="flex gap-x-3 items-center">
        <IconComponent fill="#385987" size="20px" className="flex-none" />
        {type === "linkedin" || type === "website" ? (
          <Link href={value} target="_blank">
            {" "}
            {formattedValue}{" "}
          </Link>
        ) : (
          <div>{formattedValue}</div>
        )}
      </div>
    </>
  );
}
