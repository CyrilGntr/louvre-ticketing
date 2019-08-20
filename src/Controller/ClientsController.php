<?php

namespace App\Controller;

use ___PHPSTORM_HELPERS\object;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Clients;
use App\Form\ClientsType;
use Stripe\Stripe;
use Stripe\PaymentIntent;

/**
 * Visitor controller.
 * @Route("/api", name="api_")
 */
class ClientsController extends FOSRestController
{
    /**
     * Post Visitor.
     * @Rest\Post("/postVisitor")
     *
     * @return Response
     */
    public function postVisitorAction(Request $request)
    {
        $visitor = new Clients();
        $form = $this->createForm(ClientsType::class, $visitor);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($visitor);
            $em->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }
        return $this->handleView($this->view($form->getErrors()));
    }

    /**
     * Get Visitor by command number.
     * @Rest\Get("/visitor/{numberCommand}")
     *
     * @return Response
     */
    public function verification($numberCommand)
    {
        $conn = $this->getDoctrine()->getManager();

        $sql = "SELECT SUM(price) as total FROM clients WHERE number_command = '$numberCommand'";
        $stmt = $conn->getConnection()->prepare($sql);
        $stmt->execute();

        \Stripe\Stripe::setApiKey('sk_test_DRqsUNcODqsc3bRuBRJiXt1A');

        $total = $stmt->fetch();
        $intent = PaymentIntent::create([
            'amount' => ($total['total'] * 100),
            'currency' => 'eur',
            'payment_method_types' => ['card'],
        ]);
        return $intent;
    }
}
