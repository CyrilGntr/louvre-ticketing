<?php

namespace App\Tests\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class VisitControllerTest extends WebTestCase
{
    public function testGetVisit()
    {
        $visit = static::createClient();
        $visit->request('GET', '/api/visits/date=2019-08-23');
        $this->assertEquals(200, $visit->getResponse()->getStatusCode());
    }
}
