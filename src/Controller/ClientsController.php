<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Clients;
use App\Form\ClientsType;

/**
 * Visitor controller.
 * @Route("/api", name="api_")
 */
class ClientsController extends FOSRestController
{
    /**
     * Get Visitor by command number.
     * @Rest\Get("/visitor/{numberCommand}")
     *
     * @return Response
     */
    public function getVisitorAction($numberCommand)
    {
        $repository = $this->getDoctrine()->getRepository(Clients::class);
        $visit = $repository->findBy(['numberCommand' => $numberCommand]);
        return $this->handleView($this->view($visit));
    }

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
        $repository = $this->getDoctrine()->getRepository(Clients::class);
        $visit = $repository->findBy(['numberCommand' => $numberCommand]);
        // Here calcul prix

        return $visit;
    }
}
