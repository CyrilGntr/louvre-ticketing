<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Visit;
use App\Form\VisitType;

/**
 * Visit controller.
 * @Route("/api", name="api_")
 */
class VisitController extends AbstractFOSRestController
{
    /**
     * Get Visit by why you want.
     * @Rest\Get("/visits/{column}={data}")
     *
     * @return Response
     */
    public function getVisitAction($data, $column)
    {
        $repository = $this->getDoctrine()->getRepository(Visit::class);
        if ($column == 'date') {
            $data = new \DateTime($data);
        };
        $visit = $repository->findBy([$column => $data]);
        return $this->handleView($this->view($visit));
    }

    /**
     * Post Visit.
     * @Rest\Post("/postVisit")
     *
     * @return Response
     */
    public function postVisitAction(Request $request)
    {
        $visit = new Visit();
        $form = $this->createForm(VisitType::class, $visit);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($visit);
            $em->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }
        return $this->handleView($this->view($form->getErrors()));
    }
}
