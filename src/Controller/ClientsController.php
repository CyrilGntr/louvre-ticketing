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
use PhpParser\Node\Expr\Cast\String_;
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

        $sql = "SELECT lastname, firstname, date, reduice, price, SUM(price) as total FROM clients  WHERE number_command = '$numberCommand' GROUP BY id";
        $price = "SELECT SUM(price) as total FROM clients WHERE number_command = '$numberCommand'";
        $email = "SELECT mail, date FROM visit WHERE number_command = '$numberCommand'";

        $stmt = $conn->getConnection()->prepare($sql);
        $stmt2 = $conn->getConnection()->prepare($email);
        $stmt3 = $conn->getConnection()->prepare($price);

        $stmt->execute();
        $stmt2->execute();
        $stmt3->execute();

        $list = $stmt->fetchAll();
        $email = $stmt2->fetch();
        $total = $stmt3->fetch();

        try {
            //code...
            \Stripe\Stripe::setApiKey('sk_test_DRqsUNcODqsc3bRuBRJiXt1A');
            $intent = PaymentIntent::create([
                'amount' => $total['total'] * 100,
                'currency' => 'eur',
                'payment_method_types' => ['card'],
            ]);
        } catch (\Stripe\Error\Card $e) {
            //throw $th;
            if ($e != null) {
                alert('Désolé il y\'a un problème');
            }
        }

        $to = $email['mail'];
        $subject = "Musée du Louvre - Commande n°" . $numberCommand;
        $message = "Bonjour, \nMerci pour votre commande. La viste aura lieu à la date du " . $visitDate = date("d/m/Y", strtotime($email['date'])) . "\nVoici un récapitulatif de la commande : \n";

        for ($i = 0; $i < count($list); $i++) {
            $message .= $list[$i]["lastname"] . " " . $list[$i]["firstname"] . " née(e) le " . $birthday = date("d/m/Y", strtotime($list[$i]['date'])) . " pour un tarif de " . $list[$i]["price"] . " € \n";
        }

        $message .= "Total de la commande : " . $total['total'] . " €";

        $headers = 'From: louvre@example.com' . "\r\n" .
            'Reply-To: louvre@example.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();


        mail($to, $subject, $message, $headers);

        return $intent;
    }
}
