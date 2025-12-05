
const BorderDesign = () => {
    return (
        <div>
            {/* BORDER DESIGNS */}
              <div
                className="absolute inset-0 border-4 border-[#A89265] group-hover:border-[#f2d9a7] transition-colors duration-300"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
              <div className="absolute inset-2 border-2 border-[#f0e6d2]/40"></div>

              {/* Corner Ornaments - Top Left */}
              <div className="absolute top-0 left-0 w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute top-0 left-0 w-3 h-3 bg-linear-to-br group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Top Right */}
              <div className="absolute top-0 right-0 w-12 h-12">
                <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-l from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute top-0 right-0 w-3 h-3 bg-linear-to-bl group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-12 h-12">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1 h-full bg-linear-to-t from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute bottom-0 left-0 w-3 h-3 bg-linear-to-tr group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Bottom Right */}
              <div className="absolute bottom-0 right-0 w-12 h-12">
                <div className="absolute bottom-0 right-0 w-full h-1 bg-linear-to-l from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full bg-linear-to-t from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 bg-linear-to-tl  group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Side Decorations */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-r from-[#FEF4BF]/20 to-transparent"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-l from-[#FEF4BF]/20 to-transparent"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-b from-[#FEF4BF]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-t from-[#FEF4BF]/20 to-transparent"></div>

              {/* END BORDER DESIGNS */}
        </div>
    );
}

export default BorderDesign;