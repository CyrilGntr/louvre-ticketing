<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClientsRepository")
 */
class Clients
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
     * @Assert\Length(
     *     min = 1,
     *     max = 30
     * )
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *     min = 1,
     *     max = 30
     * )
     */
    private $firstname;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $country;

    /**
     * @ORM\Column(type="boolean")
     */
    private $reduice;

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

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

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

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getReduice(): ?bool
    {
        return $this->reduice;
    }

    public function setReduice(bool $reduice): self
    {
        $this->reduice = $reduice;

        return $this;
    }
}
