<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\VisitRepository")
 */
class Visit
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *     value = 15
     * )
     */
    private $numberCommand;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Email(
     *     message = "L'email '{{ value }}' n'est pas valide (Pensez au @ et au .).",
     *     mode = "loose"
     * 
     * )
     */
    private $mail;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *      min = 1,
     *      max = 10,
     *      minMessage = "Vous devez prendre au moins {{ limit }} ticket",
     *      maxMessage = "Vous ne pouvez pas prendre plus de {{ limit }}tickets"
     * )
     */
    private $quantity;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $halfday;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumberCommand(): ?string
    {
        return $this->numberCommand;
    }

    public function setNumberCommand(string $numberCommand): self
    {
        $this->numberCommand = $numberCommand;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getHalfday(): ?bool
    {
        return $this->halfday;
    }

    public function setHalfday(bool $halfday): self
    {
        $this->halfday = $halfday;

        return $this;
    }
}
