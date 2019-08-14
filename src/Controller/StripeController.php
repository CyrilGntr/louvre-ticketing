<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Clients;

/**
 * Stripe controller.
 * @Route("/stripe", name="stripe_")
 */
class StripeController extends FOSRestController
{ }
