import { SVGProps } from "react";

export const PaperPlane = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="17"
    height="16"
    viewBox="0 0 17 16"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.fill ? props.fill : "none"}
  >
    <g id="Paper Plane">
      <path
        id="Vector"
        d="M15.4577 0.800969C15.748 1.00218 15.9004 1.34998 15.8458 1.69778L14.0061 13.6553C13.963 13.9341 13.7934 14.1784 13.5462 14.3164C13.299 14.4544 13.003 14.4716 12.7414 14.3624L9.30362 12.9338L7.33465 15.0638C7.07883 15.3426 6.67642 15.4346 6.32286 15.2966C5.96931 15.1586 5.73936 14.8166 5.73936 14.4371V12.0341C5.73936 11.9192 5.78248 11.8099 5.86009 11.7266L10.6776 6.46929C10.8443 6.28821 10.8386 6.00939 10.6661 5.83693C10.4936 5.66446 10.2148 5.65296 10.0337 5.8168L4.18718 11.0109L1.64908 9.74037C1.3444 9.58802 1.14894 9.28334 1.14031 8.94416C1.13169 8.60498 1.3099 8.28879 1.60309 8.1192L14.4804 0.760727C14.788 0.585389 15.1674 0.602635 15.4577 0.800969Z"
        fill={props.fill ? props.fill : "none"}
      />
    </g>
  </svg>
);
