const width = 40;
const height = 32.73;
const fixCentering = `translate(${-width / 2},${-height / 2})`;

export const Spiral = ({ color }) => (
  <g transform={fixCentering}>
    <path
      d="M39.9959 22.0194C39.9941 9.85674 30.1373 0.00178201 17.9782 0C8.04844 0.00174058 0.00133651 8.05022 0 17.98C0.00174013 26.1243 6.60234 32.7253 14.747 32.727C21.4625 32.7253 26.9061 27.2834 26.9061 20.5662C26.9044 14.992 22.3883 10.4746 16.8164 10.4746C12.1542 10.4764 8.37945 14.251 8.37812 18.9116C8.37812 22.841 11.5627 26.024 15.4923 26.0258C16.4965 26.0258 17.3091 25.2114 17.3091 24.209C17.3091 23.2049 16.4965 22.3922 15.4923 22.3922C13.5711 22.3887 12.0171 20.8347 12.0136 18.9134C12.0188 16.2631 14.1645 14.1172 16.8166 14.1123C20.3788 14.1192 23.2661 17.0028 23.2728 20.5685C23.2641 25.2757 19.4547 29.0852 14.7472 29.0941C11.6739 29.0923 8.9071 27.8532 6.88987 25.8398C4.87642 23.8229 3.63561 21.0578 3.63561 17.9843C3.63735 14.0183 5.23839 10.4437 7.8383 7.84195C10.4382 5.24378 14.0125 3.64274 17.9806 3.641C23.062 3.64274 27.6458 5.69624 30.9786 9.02534C34.3077 12.3579 36.3629 16.9419 36.3629 22.0251C36.3629 23.0292 37.1756 23.8436 38.1815 23.8436C39.1856 23.8436 40 23.0292 40 22.0251L39.9959 22.0194Z"
      fill={color}
    />
  </g>
);
