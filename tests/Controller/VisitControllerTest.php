<?php

namespace App\Tests\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PostControllerTest extends WebTestCase
{
    public function testShowPost()
    {
        $client = static::createClient();
        $client->request('GET', '/api/visitor/1o6oa0rz3umouyx');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
