@props(['href', 'active' => false])

<a href="{{ $href }}"
   {{ $attributes->merge([
        'class' => 'py-2 transition-colors ' .
        ($active ? 'font-medium text-orange-500' : 'text-gray-600 hover:text-gray-900')
    ]) }}>
    {{ $slot }}
</a>
