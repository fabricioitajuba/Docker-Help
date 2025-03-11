<?php

abstract class RouteSwitch
{
    protected function home()
    {
        require __DIR__ . '/pages/home.html';
    }

    protected function about()
    {
        require __DIR__ . '/pages/about.html';
    }

    protected function contact()
    {
        require __DIR__ . '/pages/contact.html';
    }
    
    public function __call($name, $arguments)
    {
        http_response_code(404);
        require __DIR__ . '/pages/not-found.html';
    }
}