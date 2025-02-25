import Image from "next/image";
import Link from "next/link";

export default function SportaLanding() {
  return (
    <div className="bg-white min-h-screen">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Image
          src="/placeholder.svg"
          alt="On The Pitch Logo"
          width={100}
          height={40}
        />
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Trang chủ
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Thuê sân
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Khóa học
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Shop thể thao
          </Link>
          {/* <Link href="#" className="text-gray-600 hover:text-gray-900">
            When have time Blog
          </Link> */}
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Đơn hàng của tôi
          </Link>
        </nav>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full">
          Đăng nhập
        </button>
      </header>

      <main>
        <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cho thuê sân thi đấu, cung cấp khóa học bóng đá
            </h1>
            <p className="text-gray-600 mb-6">
              Thuê sân dễ dàng, đặt lịch nhanh chóng, thanh toán tiện lợi
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg"
              alt="Mô tả web"
              width={300}
              height={600}
              className="mx-auto"
            />
          </div>
        </section>

        <section className="bg-gray-100 py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Chất lượng sân thi đấu cao
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Image
                src="/placeholder.svg"
                alt="List ảnh sân"
                width={250}
                height={500}
                className="mb-8 md:mb-0"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Đội ngũ giảng viên chuyên nghiệp
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Image
              src="/placeholder.svg"
              alt="List ảnh khi giảng dạy"
              width={250}
              height={500}
              className="mb-8 md:mb-0"
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 On The Pitch. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="#" className="hover:text-gray-900">
              Điều khoản
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

