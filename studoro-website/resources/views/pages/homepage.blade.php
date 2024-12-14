@extends('layout.app')

@section('content')

<div class="min-h-screen">
    <x-navigation type="homepage" />

    <!-- Hero Section -->
    <section id = "home" class="py-32">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center">
                <img
                    src   = "image/lamp.png"
                    class = "w-10 h-auto block mx-auto"
                />
                <h1 class="text-4xl font-bold mb-3"> <!-- Increased size from text-4xl to text-5xl -->
                    Optimalkan Belajarmu<br>
                    <span>dengan Teknik <span class="text-orange-500">Pomodoro</span></span>
                </h1>
                <p class="text-base text-black mb-8"> <!-- Decreased size from text-lg to text-base -->
                    Website manajemen tugas yang memadukan produktivitas dan<br>
                    metode pembelajaran efektif.
                </p>
                <a href="{{ route('pomodoro') }}"
                   class="px-8 py-2 bg-orange-400 text-white font-bold rounded hover:bg-orange-500 transition-all inline-block border-2 border-black">
                    Coba Sekarang!
                </a>
            </div>
            <div class="flex justify-between">
                <img
                src   = "image/hero1.png"
                class = "w-24"
            />
            <div class="pt-10">
                <img
                     src   = "image/hero2.png"
                     class = "w-23 h-23 block"
                />
            </div>

            </div>
        </div>
    </section>

    <section id="about-pomodoro" class="py-10 bg-white-400">
        <div class="max-w-6xl mx-auto px-4 flex items-center gap-6 border-2 rounded border-black p-5 bg-yellow-400">
            <div class="flex-1">
                <h2 class="text-3xl font-bold mb-2 text-black">
                    Belum Tahu Apa Itu Pomodoro?
                </h2>
                <p class="text-base text-black pr-10">
                    Teknik Pomodoro adalah metode manajemen waktu yang membantu kamu fokus dan produktif dengan membagi waktu belajar dalam interval terstruktur.
                </p>
            </div>
            <div class="flex-shrink-0">
                <img src="image/question.png" alt="Pomodoro Illustration" class="w-40 h-auto pr-10">
            </div>
        </div>
    </section>


    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-5">Bagaimana Cara Kerja <span class="text-orange-500">Pomodoro</span>?</h2>
            <p class="text-center text-gray-600 mb-12">
                Tingkatkan produktivitas belajarmu dengan 4 langkah sederhana
            </p>
            <div class="space-y-6">
                <!-- Step 1 -->
                <div class="flex items-center bg-white shadow-lg rounded-lg px-6 py-4 border-l-4 border-orange-500">
                    <div class="flex-shrink-0 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        1
                    </div>
                    <div class="flex-grow ml-4">
                        <h3 class="text-lg font-bold text-black">Set Timer</h3>
                        <p class="text-gray-600">
                            Pilih tugas yang ingin dikerjakan dan mulai timermu untuk sesi fokus belajar.
                        </p>
                    </div>
                    <div class="flex-shrink-0 ml-auto">
                        <img src="/image/time.png" alt="Timer Icon" class="w-10 h-10">
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="flex items-center bg-white shadow-lg rounded-lg px-6 py-4 border-l-4 border-orange-500">
                    <div class="flex-shrink-0 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        2
                    </div>
                    <div class="flex-grow ml-4">
                        <h3 class="text-lg font-bold text-black">Fokus Mengerjakan</h3>
                        <p class="text-gray-600">
                            Konsentrasi pada tugas yang kamu kerjakan, hindari distrupsi dan interupsi selama pengerjaan berlangsung.
                        </p>
                    </div>
                    <div class="flex-shrink-0 ml-auto">
                        <img src="/image/gear-icon.png" alt="Focus Icon" class="w-10 h-10">
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="flex items-center bg-white shadow-lg rounded-lg px-6 py-4 border-l-4 border-orange-500">
                    <div class="flex-shrink-0 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        3
                    </div>
                    <div class="flex-grow ml-4">
                        <h3 class="text-lg font-bold text-black">Istirahat Sejenak</h3>
                        <p class="text-gray-600">
                            Jika sudah 25 menit, istirahat sejenak selama 5 menit untuk merilekskan pikiran.
                        </p>
                    </div>
                    <div class="flex-shrink-0 ml-auto">
                        <img src="/image/break-icon.png" alt="Break Icon" class="w-10 h-10">
                    </div>
                </div>

                <!-- Step 4 -->
                <div class="flex items-center bg-white shadow-lg rounded-lg px-6 py-4 border-l-4 border-orange-500">
                    <div class="flex-shrink-0 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        4
                    </div>
                    <div class="flex-grow ml-4">
                        <h3 class="text-lg font-bold text-black">Istirahat Panjang</h3>
                        <p class="text-gray-600">
                            Istirahatlah setelah 4 kali putaran selama 15-30 menit.
                        </p>
                    </div>
                    <div class="flex-shrink-0 ml-auto">
                        <img src="/image/apple-icon.png" alt="Long Break Icon" class="w-10 h-10">
                    </div>
                </div>
            </div>
        </div>
    </section>


        <!-- Why Choose Us Section -->
        <section id="why-us" class="py-20">
            <div class="max-w-6xl mx-auto px-4">
                <h2 class="text-4xl font-bold mb-5">Kenapa Pilih Kami?</h2>
                <div class="flex flex-col lg:flex-row gap-8 items-start bg-white shadow-lg rounded-lg border-2 rounded border-black">
                    <!-- Bagian Kiri -->
                    <div class="bg-yellow-400 p-6 pb-12 rounded-l-lg"> <!-- Ditambahkan pb-12 untuk padding bottom -->
                        <div class="max-w-xl">
                            <p class="mb-4 pr-6">
                                Kami memahami tantangan yang dihadapi siswa dalam mengatur waktu dan menyelesaikan tugas sekolah. Dengan kombinasi metode Pomodoro dan fitur inovatif, kami hadir untuk membantu Anda belajar lebih efektif dan tetap terorganisir. Berikut adalah fitur-fitur unggulan yang kami tawarkan:
                            </p>
                            <p class="mb-4 pr-6">
                                Catat semua tugas sekolah Anda dalam daftar yang mudah digunakan. Tandai tugas yang telah selesai dan dapatkan pengingat untuk menjaga Anda tetap pada jalur dan terorganisir.
                            </p>
                            <p class="mb-4 pr-6">
                                Atur sesi fokus dan waktu istirahat sesuai kebutuhan Anda. Pilih durasi 15 menit dengan istirahat 5 menit atau 30 menit fokus dengan 10 menit istirahat untuk mengoptimalkan pengalaman belajar Anda.
                            </p>
                        </div>
                    </div>

                <!-- Bagian Kanan -->
                <div class="flex-1 flex flex-col gap-6 items-center pt-7">
                    <!-- Card 1 -->
                    <div class="flex flex-col border rounded-lg shadow-md p-4 w-48">
                        <div class="flex items-center">
                            <img src="/image/timer.png" alt="Pomodoro Icon" class="w-18 h-12">
                            <h3 class="font-bold text-lg text-black">Pomodoro</h3>
                        </div>
                        <div>
                            <p class="text-gray-600">Belajar dan istirahat menjadi seimbang.</p>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="flex flex-col border rounded-lg shadow-md p-4 w-48">
                        <div class="flex items-center">
                            <img src="/image/note.png" alt="Note Icon" class="w-18 h-12">
                            <h3 class="font-bold text-lg text-black">Note</h3>
                        </div>
                        <div>
                            <p class="text-gray-600">Simpan dan atur jadwal tugasmu agar lebih efisien.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- FAQ Section -->
<section id = "faq" class="py-20 bg-white"> <!-- Increased padding -->
    <div class="max-w-5xl mx-auto px-6"> <!-- Increased width and padding -->
        <h2 class="text-4xl font-bold text-center mb-10">Pertanyaan Yang Sering Ditanyakan</h2> <!-- Increased font size and margin -->
        <div class="space-y-6"> <!-- Increased spacing between FAQ items -->
            <!-- FAQ Item 1 -->
            <div class="border border-gray-300 rounded-lg overflow-hidden">
                <button class="w-full text-left px-8 py-6 flex items-center justify-between text-xl focus:outline-none" onclick="toggleFaq(1)">
                    <span class="font-semibold text-gray-800">Berapa lama satu sesi pomodoro?</span>
                    <svg id="icon-1" class="w-6 h-6 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <div id="faq-1" class="hidden px-8 py-6 bg-gray-100 text-lg text-gray-700">
                    Satu sesi Pomodoro standar berlangsung selama 25 menit, diikuti dengan istirahat 5 menit. Setelah 4 sesi, Anda bisa mengambil istirahat yang lebih panjang sekitar 15-30 menit.
                </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="border border-gray-300 rounded-lg overflow-hidden">
                <button class="w-full text-left px-8 py-6 flex items-center justify-between text-xl focus:outline-none" onclick="toggleFaq(2)">
                    <span class="font-semibold text-gray-800">Apakah bisa mengubah durasi Pomodoro?</span>
                    <svg id="icon-2" class="w-6 h-6 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <div id="faq-2" class="hidden px-8 py-6 bg-gray-100 text-lg text-gray-700">
                    Durasi Pomodoro dapat diubah sesuai preferensi Anda melalui pengaturan aplikasi atau alat manajemen Pomodoro yang Anda gunakan.
                </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="border border-gray-300 rounded-lg overflow-hidden">
                <button class="w-full text-left px-8 py-6 flex items-center justify-between text-xl focus:outline-none" onclick="toggleFaq(3)">
                    <span class="font-semibold text-gray-800">Apa yang harus dilakukan jika ada gangguan saat sesi pomodoro?</span>
                    <svg id="icon-3" class="w-6 h-6 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <div id="faq-3" class="hidden px-8 py-6 bg-gray-100 text-lg text-gray-700">
                    Jika ada gangguan, catat gangguan tersebut dan coba kembali fokus pada tugas Anda. Jika gangguan mendesak, selesaikan terlebih dahulu sebelum melanjutkan sesi.
                </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="border border-gray-300 rounded-lg overflow-hidden">
                <button class="w-full text-left px-8 py-6 flex items-center justify-between text-xl focus:outline-none" onclick="toggleFaq(4)">
                    <span class="font-semibold text-gray-800">Bagaimana jika tugas selesai sebelum sesi pomodoro selesai?</span>
                    <svg id="icon-4" class="w-6 h-6 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <div id="faq-4" class="hidden px-8 py-6 bg-gray-100 text-lg text-gray-700">
                    Jika tugas selesai sebelum sesi selesai, gunakan sisa waktu untuk meninjau tugas Anda atau mempersiapkan tugas berikutnya.
                </div>
            </div>
        </div>
    </div>
</section>

        <!-- Call-to-Action Section -->
    <section class="py-16 text-center bg-white">
        <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-3xl font-semibold text-gray-800 mb-9">
                Mulai fokus, kelola waktu, dan<br> raih prestasi lebih baik.
            </h2>
            <a href="{{ route('pomodoro') }}"
                   class="px-8 py-2 bg-orange-400 text-white font-bold rounded hover:bg-orange-500 transition-all inline-block border-2 border-black">
                    Coba Sekarang!
                </a>
            <div class="mt-12">
                <img src="https://i.pinimg.com/originals/84/2c/91/842c917c4949d2a131f2e2ac735ef382.gif" alt="Collaboration Image" class="mx-auto">
            </div>
        </div>
    </section>
<x-footer></x-footer>


</div>

<script>
    function toggleFaq(id) {
        const faq = document.getElementById(`faq-${id}`);
        const icon = document.getElementById(`icon-${id}`);
        if (faq.classList.contains('hidden')) {
            faq.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            faq.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    }
</script>
</div>
@endsection
