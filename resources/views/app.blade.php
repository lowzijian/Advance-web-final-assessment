<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>LEMON</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background: white;
        }

        h1,
        .lemon-heading-title {
            font-weight: bold;
            margin: 15px 0px;
        }

        .lemon-heading-title {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lemon-heading-title span {
            background: #fff;
            margin-right: 15px;
            font-size: 23px;
            font-weight: bold;
            line-height: 42px;
            color: #FCCE51;
        }

        .lemon-heading-title:after {
            background: #FCCE51;
            height: 3px;
            flex: 1;
            content: '';
        }

        .lemon-heading-title:before {
            background: none;
        }

        .lemon-button-container {
            margin-top: 15px;
            justify-items: flex-end;
            display: flex;
            justify-content: flex-end;
            padding: 5px;
        }

        .lemon-button {
            margin: 8px !important;
        }

        .lemon-form {
            padding: 8px;
            margin: 15px 0px;
            width: inherit;
        }

        .lemon-container {
            margin-top: 15px;
            margin-bottom: 15px;
        }

        .lemon-nav-item {
            display: flex;
            align-items: center;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div id="app"></div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
