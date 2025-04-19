import React from "react";
import { LogoProps } from "../types/components";

const Logo = ({
  width = "128px",
  height = "128px",
  fill = "#e63946",
  stroke = "none",
}: LogoProps) => {
  return (
    <div className="hover:cursor-pointer px-4">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 1024 1024"
        preserveAspectRatio="xMidYMid meet"
        className="scale-150"
      >
        <g
          transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
          fill={fill}
          stroke={stroke}
        >
          <path
            d="M5045 8344 c-278 -33 -467 -121 -631 -297 -160 -171 -266 -423 -296
-707 -6 -58 -16 -111 -21 -117 -7 -10 -56 -13 -183 -13 -95 0 -175 -4 -178 -9
-3 -5 -8 -39 -12 -77 -9 -106 -7 -107 170 -114 143 -5 146 -6 173 -33 28 -27
28 -28 34 -200 3 -94 7 -173 8 -175 0 -2 39 -43 85 -91 141 -147 221 -290 268
-478 17 -70 22 -119 22 -243 1 -139 -2 -167 -27 -265 -17 -64 -49 -153 -79
-214 -43 -91 -62 -117 -137 -191 -103 -104 -187 -149 -326 -176 -49 -10 -96
-22 -102 -27 -17 -12 -17 -109 -1 -125 16 -16 1239 -17 1269 -2 15 9 19 22 19
69 0 35 -5 63 -12 69 -7 5 -44 15 -81 21 -149 26 -236 79 -278 173 l-24 53 -3
904 c-2 669 0 907 9 917 9 11 60 14 254 14 197 0 245 3 254 14 7 8 14 45 17
83 9 107 21 102 -256 105 -129 1 -245 4 -257 6 -23 4 -23 7 -23 151 0 331 65
573 190 705 65 69 116 90 202 84 79 -5 122 -33 151 -97 18 -40 19 -58 13 -168
-7 -117 -6 -125 15 -155 50 -70 183 -92 276 -45 60 31 93 66 128 137 64 127
19 300 -101 393 -115 90 -345 142 -529 121z"
          />
          <path
            d="M6537 8330 c-303 -51 -571 -261 -707 -554 -61 -130 -110 -337 -110
-463 0 -28 -4 -63 -10 -77 l-10 -26 -143 0 c-98 0 -147 -4 -155 -12 -7 -7 -12
-42 -12 -88 0 -46 5 -81 12 -88 7 -7 31 -12 54 -12 24 0 47 -6 54 -15 9 -11 7
-91 -10 -372 -12 -197 -20 -395 -17 -441 6 -110 41 -179 147 -295 44 -48 83
-99 87 -115 5 -15 8 -146 8 -292 0 -247 -2 -270 -23 -338 -37 -119 -112 -173
-277 -199 l-50 -8 -3 -69 c-2 -49 1 -72 10 -77 15 -10 1128 -12 1152 -3 20 8
23 126 4 141 -7 5 -44 15 -81 22 -163 28 -247 87 -282 196 -18 54 -20 89 -20
325 0 146 4 277 8 293 4 15 44 66 88 115 92 100 136 180 149 273 9 58 -6 475
-26 736 -5 74 -4 83 15 102 20 20 32 21 219 21 144 0 203 3 216 13 14 10 16
26 14 97 l-3 85 -245 5 c-135 3 -247 7 -249 8 -2 1 -1 104 2 230 6 249 21 348
72 477 52 130 102 194 180 231 63 30 99 30 155 2 33 -17 51 -35 68 -68 22 -42
23 -54 19 -171 -5 -141 2 -169 51 -211 85 -71 228 -60 313 25 93 93 104 270
25 396 -57 90 -186 167 -328 195 -82 17 -277 20 -361 6z m-566 -1337 c11 -13
15 -88 17 -369 3 -344 2 -354 -18 -374 -11 -11 -28 -20 -39 -20 -44 0 -45 11
-37 387 4 205 11 363 17 374 12 23 42 25 60 2z m237 5 c10 -14 32 -436 32
-620 0 -95 -2 -110 -20 -128 -25 -25 -52 -26 -72 -2 -13 14 -16 73 -21 366
l-5 348 23 24 c27 27 47 30 63 12z m-450 -359 c2 -350 2 -356 -19 -383 -26
-33 -54 -31 -81 5 -20 26 -20 32 -3 370 9 189 18 350 21 357 2 9 17 12 41 10
l38 -3 3 -356z"
          />
          <path
            d="M2933 6613 c5 -277 17 -367 72 -530 80 -239 221 -444 395 -573 90
-66 249 -141 385 -180 126 -36 177 -62 228 -119 20 -23 39 -41 42 -41 3 0 5
33 5 73 0 316 -193 683 -552 1052 -58 60 -127 126 -152 145 -25 19 -45 38 -46
43 0 11 224 -141 311 -211 110 -89 285 -275 352 -375 129 -192 216 -442 217
-622 1 -47 2 -49 16 -30 68 88 120 257 130 420 28 474 -277 876 -815 1075
-169 62 -429 120 -540 120 l-53 0 5 -247z"
          />
          <path
            d="M4060 4351 c-125 -24 -221 -75 -312 -168 -196 -200 -241 -522 -105
-763 48 -86 159 -190 247 -234 204 -99 504 -83 679 36 247 170 333 525 195
804 -42 85 -139 196 -211 242 -88 56 -193 84 -328 88 -66 2 -140 -1 -165 -5z
m258 -123 c91 -43 162 -139 198 -269 8 -30 18 -115 21 -189 14 -344 -106 -543
-327 -543 -152 0 -251 74 -311 232 -97 255 -39 618 116 737 51 38 101 53 183
54 54 0 84 -5 120 -22z"
          />
          <path
            d="M5503 4349 c-223 -37 -419 -234 -469 -469 -19 -90 -14 -268 10 -343
47 -146 167 -288 297 -350 105 -51 218 -71 349 -64 224 12 378 97 491 271 50
76 75 144 90 245 49 339 -146 641 -456 706 -76 16 -229 18 -312 4z m274 -125
c129 -61 199 -206 210 -439 16 -351 -107 -558 -333 -558 -213 -1 -345 194
-346 508 0 183 40 326 117 421 79 96 230 125 352 68z"
          />
          <path
            d="M6510 4331 c-60 -6 -65 -8 -65 -30 0 -24 7 -30 57 -49 15 -6 35 -26
45 -44 16 -30 18 -70 21 -428 2 -217 0 -419 -3 -449 -8 -63 -46 -111 -89 -111
-45 0 -46 -65 -1 -76 13 -3 162 -4 332 -2 277 4 316 7 387 26 226 62 356 178
428 381 29 81 36 264 14 351 -41 162 -141 287 -287 359 -136 66 -193 75 -504
76 -148 1 -299 -1 -335 -4z m610 -130 c71 -27 116 -64 160 -132 56 -86 83
-197 83 -334 -1 -228 -75 -377 -229 -455 -41 -21 -66 -26 -149 -28 -155 -5
-139 -57 -143 484 -1 252 0 464 2 471 9 22 214 17 276 -6z"
          />
          <path
            d="M2504 4316 c-12 -30 1 -50 37 -59 24 -5 42 -18 55 -40 18 -30 19 -58
22 -457 2 -234 0 -439 -3 -457 -8 -44 -35 -73 -75 -82 -26 -5 -36 -13 -38 -29
-7 -50 1 -52 282 -52 281 0 286 1 286 52 0 24 -5 28 -37 34 -65 12 -110 34
-124 62 -9 19 -14 82 -17 210 l-4 182 105 0 c92 0 108 -3 138 -23 18 -12 43
-38 56 -57 47 -75 57 -84 81 -71 21 11 22 16 22 204 0 193 -4 217 -36 217 -7
0 -32 -25 -56 -57 -69 -90 -82 -97 -203 -101 l-105 -4 0 205 c0 113 3 212 6
221 5 13 25 16 123 16 189 -1 221 -14 286 -123 43 -71 51 -79 84 -70 30 8 35
38 25 171 l-9 117 -448 3 c-384 2 -448 0 -453 -12z"
          />
          <path
            d="M4602 2839 c-74 -13 -113 -31 -162 -76 -59 -52 -80 -102 -80 -188 0
-134 43 -183 229 -265 127 -56 173 -86 202 -134 77 -127 -85 -237 -238 -161
-54 27 -88 68 -123 148 -16 37 -26 47 -44 47 -13 0 -28 -6 -33 -12 -10 -13 -3
-222 7 -230 3 -3 30 -15 60 -28 46 -20 77 -24 185 -28 116 -3 136 -1 189 18
68 26 128 77 159 134 30 57 29 164 -1 222 -30 59 -66 85 -222 164 -172 88
-215 128 -207 198 3 32 13 53 36 76 29 29 36 31 104 31 65 0 78 -3 110 -28 20
-15 48 -50 64 -79 33 -61 55 -78 81 -62 14 10 16 24 13 100 -5 122 -9 130 -73
143 -82 16 -198 21 -256 10z"
          />
          <path
            d="M5975 2826 c-127 -31 -233 -114 -289 -227 -45 -90 -60 -163 -54 -271
14 -246 209 -418 473 -418 146 0 263 45 351 135 176 181 176 481 0 657 -65 65
-131 102 -217 123 -76 17 -194 18 -264 1z m192 -81 c159 -47 243 -300 178
-543 -46 -176 -187 -255 -332 -187 -88 41 -144 138 -162 285 -12 96 -1 201 30
286 28 77 99 148 161 162 61 14 69 14 125 -3z"
          />
          <path
            d="M2508 2825 c-19 -20 -7 -53 22 -64 56 -19 60 -44 60 -398 0 -342 -2
-357 -52 -365 -28 -4 -46 -33 -33 -54 9 -14 35 -16 205 -15 193 2 220 7 220
37 0 14 -8 18 -76 44 -46 17 -54 45 -54 194 l0 132 73 -3 c82 -4 111 -20 142
-77 16 -29 25 -36 45 -34 l25 3 3 144 c3 143 -3 171 -33 171 -7 0 -24 -19 -39
-43 -37 -58 -59 -70 -143 -75 l-73 -5 0 162 0 161 90 0 c61 0 100 -5 120 -15
29 -15 80 -73 80 -92 0 -12 38 -53 50 -53 5 0 15 6 23 14 11 12 13 36 9 113
-2 54 -8 102 -12 106 -9 11 -643 22 -652 12z"
          />
          <path
            d="M3306 2814 c-19 -19 -20 -30 -3 -43 6 -6 28 -23 47 -40 l35 -29 5
-284 5 -285 30 -58 c35 -69 88 -113 172 -145 51 -19 73 -21 178 -18 106 4 128
8 183 33 80 36 146 106 167 178 12 39 15 108 15 311 0 282 3 300 53 324 32 15
36 47 7 62 -20 11 -211 7 -230 -5 -20 -12 -9 -47 24 -78 29 -28 35 -41 41 -97
4 -36 5 -158 3 -270 -3 -169 -7 -212 -21 -245 -41 -91 -111 -130 -225 -123
-88 5 -139 35 -173 105 -23 46 -24 57 -27 313 -3 239 -1 268 15 300 13 25 26
36 48 40 24 4 30 10 30 30 0 22 -6 26 -45 32 -25 3 -107 7 -182 7 -112 1 -139
-2 -152 -15z"
          />
          <path
            d="M5113 2814 c-8 -23 9 -48 36 -52 12 -2 29 -15 39 -30 15 -23 17 -63
20 -341 3 -350 2 -362 -57 -389 -27 -13 -36 -23 -36 -42 l0 -25 191 -3 c159
-2 193 0 203 12 19 23 5 51 -31 61 -56 17 -58 28 -58 380 0 352 2 360 59 380
39 13 49 29 31 50 -10 12 -48 15 -202 15 -165 0 -189 -2 -195 -16z"
          />
          <path
            d="M6694 2816 c-11 -29 1 -50 35 -60 60 -17 64 -40 65 -381 1 -337 -1
-346 -67 -378 -30 -14 -38 -23 -35 -40 3 -22 6 -22 158 -22 l155 0 0 30 c0 23
-5 31 -22 33 -12 2 -33 16 -47 32 -22 26 -25 41 -30 152 -9 186 -12 408 -6
408 3 0 102 -118 220 -262 118 -144 248 -297 289 -340 64 -68 78 -78 108 -78
18 0 36 6 38 13 3 6 8 183 13 392 8 417 8 418 69 447 20 9 28 21 28 38 l0 25
-150 0 c-148 0 -150 0 -153 -22 -3 -17 6 -28 33 -44 65 -39 70 -57 73 -306 2
-123 0 -223 -5 -223 -8 1 -359 430 -439 538 l-46 62 -139 0 c-112 0 -141 -3
-145 -14z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
