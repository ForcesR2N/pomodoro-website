<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Pomodoro Timer</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    {{-- Mix CSS --}}
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/notes.css') }}">
</head>
<body>
    @yield('content')

    {{-- Mix JavaScript --}}
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
